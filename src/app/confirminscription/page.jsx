"use client"
import {useEffect} from "react"
import {Result} from "antd"
import {Button} from "@nextui-org/react"
import {useRouter} from "next/navigation"
import Link from "next/link"
const page=()=>{
    const router=useRouter();
    // const {nom,emailAdresse}=JSON.parse(localStorage.getItem("profil")?localStorage.getItem("profil") : "[{'nom':'','emailAdresse':''}]")[0];
    const {nom,emailAdresse}=localStorage.getItem("profil")==null?{nom:'',emailAdresse:""}:JSON.parse(localStorage.getItem("profil"));
    const message=`${nom?.toUpperCase()} votre inscription s'est bien faite`;
    useEffect(()=>{
        localStorage.getItem("profil")==null && router.push("/home");
    },[])
    return(
        <div className="bg-white pb-6">
            <Result
                status="success"
                title={message}
                subTitle={`Un email vous est envoyé sur votre adresse : ${emailAdresse}, veuillez l'ouvrir pour confirmer`}
                extra={[
                <Link href="/home">
                    <Button color="primary">
                        continuer
                    </Button>
                </Link>
                ,
                // <Button key="buy">Buy Again</Button>,
                ]}
            />
        </div>
    )
}
export default page
