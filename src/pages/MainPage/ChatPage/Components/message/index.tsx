import {useToast} from "@chakra-ui/react";

const Message = () => {
  const toast = useToast()

  // 发送成功提示
  const success = () => {
    toast({
      position: "top",
      title: 'success',
      description: 'Good!!!',
      variant: "solid",
      duration: 3000,
      isClosable: true
    })
  }
  // 字符为空的提示
  const errorEmpty = () => {
    toast({
      position: "top",
      title: 'Error',
      description: 'message is empty!!!',
      status: 'error',
      duration: 3000,
      isClosable: true
    })
  }

  const errorHttp = () => {
    toast({
      position: "top",
      title: 'Error',
      description: 'connection error!!!',
      status: 'error',
      duration: 3000,
      isClosable: true
    })
  }

  return{success,errorEmpty,errorHttp}
}

export default Message