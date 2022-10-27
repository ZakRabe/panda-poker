import { ref, set } from '@firebase/database'
import { Input, Modal, ModalProps } from 'antd'
import { ChangeEventHandler, FC, useContext, useEffect, useState } from 'react'

import { pop } from './confetti'
import database from './firebase'
import UserContext from './UserContext'

const validFileTypes = ["image/png", "image/gif", "image/jpeg"];

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditUser: FC<Pick<ModalProps, "open" | "onCancel" | "onOk">> = ({
  open = false,
  onCancel,
  onOk,
}) => {
  const user = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [img, setImg] = useState(user.img);

  useEffect(() => {
    setName(user.name);
    setImg(user.img);
  }, [user]);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setName(value);

  const onImgChange: ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    if (!files) {
      return;
    }
    const file = files[0];
    if (file.size > 1000000) {
      alert("🥺 Plz dont upload huge images. I can't afford it");
      return;
    }
    if (!validFileTypes.includes(file.type)) {
      return;
    }
    setImg(await toBase64(file));
  };

  const onSave = () => {
    set(ref(database, "users/" + user.id), {
      name,
      img,
    });
    pop();
  };
  return (
    <Modal
      open={open}
      onOk={(e) => {
        onSave();
        onOk?.(e);
      }}
      onCancel={onCancel}
    >
      <div>
        <label htmlFor="name">Name</label>
        <Input name="name" value={name} onChange={onNameChange} />
      </div>
      <div>
        <label htmlFor="file">Avatar</label>
        <Input
          name="img"
          type="file"
          onChange={onImgChange}
          accept={validFileTypes.join(", ")}
        />
      </div>

      <div>
        {!!(img || user.img) && (
          <img
            alt={`${user.name} avatar`}
            src={img ?? user.img}
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        )}
      </div>
    </Modal>
  );
};
export default EditUser;
