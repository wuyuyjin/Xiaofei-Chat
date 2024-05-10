// import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import {RouterProvider} from "react-router-dom";
import MainRoute from "./routes"

const {router} = MainRoute()

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <ChakraProvider toastOptions={{defaultOptions: {position: "top"}}}>
    <RouterProvider router={router}/>
  </ChakraProvider>
  // </React.StrictMode>,
)