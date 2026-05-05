import { draftMode } from "next/headers";
import { client ,previewClient} from "./client";

export async function getClients(){
    const {isEnabled} = await draftMode()
    if(isEnabled){
        return previewClient
    }
    return client

}

