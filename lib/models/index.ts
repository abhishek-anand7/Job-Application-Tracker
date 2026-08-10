import "./board";
import "./column";
import "./job-applications";

export { default as Board } from "./board";
export { default as Column } from "./column";
export { default as JobApplication } from "./job-applications";

//It acts as a central file for exporting models. It imports/loads the model files and re-exports them, allowing us to import multiple models from one location instead of importing each model separately.