import { useState } from "react"
import ButtonLess from "./components/ButtonLess"

export default function Test() {
    const [isDisabled, setIsDisabled] = useState(false)
  
    const disableHandler = () => {
      setIsDisabled(true)
    }
    return (
        
        <ButtonLess isDisabled={isDisabled} value='отключить' onPress={disableHandler}/> 
    )
}