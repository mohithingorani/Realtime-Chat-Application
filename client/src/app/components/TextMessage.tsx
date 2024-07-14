import { MessageObject } from "../chat/page"

interface TextMessageProps {
    messageObject: MessageObject
    myId: string | undefined
}



export default function TextMessage({ messageObject, myId }: TextMessageProps) {
    return (
        <div>
            {messageObject.id === myId ?
                <div className="flex flex-col">
                    <div className="flex justify-end mt-2 ">
                        <div className="max-w-[45%] w-max bg-[#1A66FF] px-3 py-1.5 rounded-l-lg rounded-tr-lg overflow-wrap break-words">
                            <div className="flex flex-col">
                                <div className="text-lg text-white px-2 py-1.5 ">
                                    {messageObject.message}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="text-xs pt-1 text-slate-300 flex justify-end" >
                            {messageObject.time}
                        </div>
                    </div>
                </div>
                :
                <div className="flex flex-col">
                    <div className="flex justify-start mt-2">
                        <div className="max-w-[45%] w-max bg-[#1B1B1B] px-3 py-1.5 rounded-r-lg rounded-tl-lg overflow-wrap break-words">
                            <div className="flex flex-col">
                                <div className="text-lg text-white px-2 py-1.5">
                                    {messageObject.message}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="text-xs pt-1 text-slate-300 flex justify-start" >
                            {messageObject.time}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}