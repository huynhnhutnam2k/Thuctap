import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import departmentReducer from "./departmentSlice";
import situationReducer from "./situationSlice";
import diagnoseReducer from "./diagnoseSlice";
import treatmentReducer from "./treatmentSlice";
import markReducer from "./markSlice";
import preliminaryReducer from './preliminarySlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    situation: situationReducer,
    diagnose: diagnoseReducer,
    treatment: treatmentReducer,
    mark: markReducer,
    pre: preliminaryReducer
  },
});
