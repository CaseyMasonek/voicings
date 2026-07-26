import {useEffect, useState} from "react";

export default function App() {
    const notes = [
        "A", "B", "C", "D", "E", "F", "G",
        "A#", "C#", "D#", "F#", "G#",
        "Ab", "Bb", "Db", "Eb", "Gb"
    ]

    const [extensions,setExtensions] = useState([
        "", "-", "5", "6", "-6", "7", "-7", "ø7", "Δ7", "°", "°7", "sus2", "sus4",
        "(b5)", "add2", "add4", "add9", "add11", "6", "6/9", "6/11", "7/6", "7(b5)", "7(b5,b9)", "7(b5,#9)", "7(b9)", "7(#5)", "7(#5,b9)", "7(#5,#9)", "7(#9)", "7(#11)", "9", "9(b5)", "9(#5)", "11", "11(b9)", "13", "13(b9)", "13(#11)", "+", "+6", "Δ7/6", "Δ7(b5)", "Δ7(b9)", "Δ7(#5)", "Δ7(#9)", "Δ7(#11)", "Δ9", "Δ9(#5)", "Δ9(#11)", "Δ11", "Δ13", "Δ13(#11)",
        "-add2", "-add4", "-add9", "-add11", "-(b6)", "-6/9", "-6/11", "-7", "-7/4", "-7/6", "-7(b5,b9)", "-7(b9)", "-9", "-9(b5)", "-11", "-13", "-Δ7", "-Δ7(b9)", "-Δ9",
        "°7(b9)", "°9",
        "sus24", "6sus2", "6sus4", "6/9sus4", "7sus2", "7sus4", "9sus4", "13sus4", "Δ7sus2", "Δ7sus4",
    ].map((x) => {return {extension:x, enabled:true};}));

    function getRandomChord() {
        // eslint-disable-next-line react-hooks/purity
        const randomNote = notes[Math.floor(Math.random() * notes.length)]

        const enabled = extensions.filter(x => x.enabled)

        if (enabled.length === 0) return "please enable an extension"

        // eslint-disable-next-line react-hooks/purity
        const randomExtension = enabled.filter(x => x.enabled)[Math.floor(Math.random() * enabled.length)]

        return randomNote + randomExtension.extension;
    }

    const [chord,setChord] = useState(getRandomChord());

    const [count,setCount] = useState(1)

    const [tempo,setTempo] = useState(120);

    useEffect(() => {
        new Promise(resolve => setTimeout(resolve, 60/tempo * 1000)).then(() => {
            setCount(count+1)

            if (count == 4) {
                setCount(1)
                setChord(getRandomChord());
            }
        })


    },[count,tempo,getRandomChord])

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className={"absolute top-0 right-2 text-lg"}>Settings</button>
            {isModalOpen && (<div className={"absolute w-full h-[100dvh] bg-black/50 flex justify-center items-center"}>
                <div className={"absolute min-w-80 w-1/2 h-[90vh] bg-white rounded-xl"}>
                    <div className={"h-[20vh] md:h-[12vh] flex flex-col justify-between overflow-scroll"}>
                        <button onClick={() => setIsModalOpen(false)} className={"absolute top-4 right-6 text-2xl"}>X</button>
                        <h3 className={"text-2xl m-4"}>Settings</h3>
                        <div className={"flex flex-row gap-x-3 px-3"}>
                            <button onClick={() =>
                                setExtensions(extensions.map(x => {return {extension:x.extension, enabled:true}}))}
                                    className={"p-1 border-2 rounded-xl grow"}
                            >
                                Enable all
                            </button>
                            <button onClick={() =>
                                setExtensions(extensions.map(x => {return {extension:x.extension, enabled:false}}))}
                                    className={"p-1 border-2 rounded-xl grow"}
                            >
                                Disable all
                            </button>
                        </div>

                        <hr />
                    </div>


                    <div className={"h-[70vh] md:h-[78vh] grid grid-cols-2 overflow-y-scroll"}>
                        {extensions.map((x, i) => (
                            <div className={"ml-2 flex flex-row"} key={i}>
                                <div className={"w-15"}>{x.extension != "" ? x.extension : "(major)"}</div>
                                <input type={"checkbox"} checked={x.enabled} onClick={() => extensions[i].enabled = !extensions[i].enabled}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>)}
        <div className={"w-full h-[100dvh] flex-col flex items-center justify-center"}>
            <p className={"text-5xl mb-5"}>{chord}</p>
            <div className={"flex-row mb-4"}>
                {Array.from({length: count}).map((_, i) => (
                    <span key={i} className={"w-fit text-xl"} >
                        ●
                    </span>
                ))}
                {Array.from({length: 4 - count}).map((_, i) => (
                    <span key={i} className={"text-xl"}>
                        ○
                    </span>
                ))}
            </div>
            <div className={"flex-row flex items-center justify-center gap-x-5"}>
                <button className={"border-2 px-3 py-1 rounded-xl hover:bg-gray-100 active:bg-gray-2"} onClick={() => setTempo(tempo => tempo - 5)}>
                    -
                </button>
                <p className={"text-2xl w-30 text-center "}>{tempo} bpm</p>
                <button className={"border-2 px-3 py-1 rounded-xl hover:bg-gray-100 active:bg-gray-200"} onClick={() => setTempo(tempo => tempo + 5)}>
                        +
                </button>
            </div>
        </div>
        </>
    );
}