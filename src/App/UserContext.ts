import { createContext } from "react";

import { User } from "../types";

export default createContext<User>({
  id: "",
  name: "",
  img: "",
});
