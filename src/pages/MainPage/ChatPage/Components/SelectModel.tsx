import {useState} from "react";
import modalPath from "../../../../store/selectPath/modalPath.ts";

// 选择语言大模型
const SelectModel = () => {
    const modalName = modalPath.use.modalName()
    const changeModal = modalPath.use.changeModal()
    const [select, setSelect] = useState(modalName);

    const selectModal = (index: number) => {
        setSelect(index);
        changeModal(index)
    };

    const selectData = [
        {key: 0, modalName: "讯飞大模型"},
        {key: 1, modalName: "Ollma大模型"},
        {key: 2, modalName: "Gemini大模型"},
    ];
    return (
        <div className="flex flex-col space-y-2">
            {selectData.map((item, index) => (
                <button
                    className={`btn btn-wide btn-sm ${select === index ? "btn-active btn-neutral" : "btn-outline"}`}
                    key={item.key}
                    onClick={() => selectModal(index)}
                >
                    <p>{item.modalName}</p>
                    {/*{select === index ? <IconSquareRoundedCheck/> : ""}*/}
                </button>
            ))}
        </div>
    )
}

export default SelectModel