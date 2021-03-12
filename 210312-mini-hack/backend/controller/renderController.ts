import path from "path"

// @desc    Load home page
// @param   GET /
export const loadHome = (request: any, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../frontend/home/index.html"))
}

// @desc    Load create page
// @param   GET /create
export const loadCreate = (request: any, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../frontend/create/index.html"))
}

// @desc    Load edit page
// @param   GET /edit/:id
export const loadEdit = (request: any, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../frontend/edit/index.html"))
}
