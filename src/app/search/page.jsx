"use client"
import {useState,useEffect} from "react"
import {useRouter} from "next/navigation"
import Layout from "@/app/components/layouts/LayoutClient"
import {Card,CardBody,Divider} from "@nextui-org/react"
import {SearchIcon} from "@/app/components/icons/SearchIcon"
import {Spin} from "antd"
import {postData} from "@/app/fcts/helper"
import Entreprise from "@/app/components/profil/Entreprise"
const page=()=>{
    const [resultat,setResultat]=useState([]);
    const [searchDone,setSearchDone]=useState("false");
    const [spinning,setSpinning]=useState(true)
    const queryString=window.location.search;
    const urlParams=new URLSearchParams(queryString);

    const search=async(lieu=null,secteur=null)=>{
        setSearchDone(false);
        await postData("search",{q:urlParams.get('q'),lieu:urlParams.get('lieu'),secteur:urlParams.get('secteur')})
        .then(r=>{
            setSearchDone(true);
            setResultat(r.data);
            setSpinning(false);
            setSearchDone(true);
        }).catch(err=>{
            setSearchDone(true);
        })
    }
    useEffect(()=>{
        search();
    },[]);

    return(
        <Layout hideHeader>
            <div className="flex flex-col gap-2 justify-center items-center mt-5  px-2">
                <Card className="w-full ">
                    <CardBody>
                        <div className="flex gap-4"><SearchIcon /> Recherche : <span className="text-xl font-bold">" {urlParams.get('q')} "</span></div>
                    </CardBody>
                </Card>
                <Card className="w-full ">
                    <CardBody className="bg-slate-100">
                        <div>
                            <div className="flex gap-4 mb-4">
                                Resultat : {searchDone ? resultat?.length+" Trouvé(s)":''}
                            </div>
                            <Divider />

                            <div>
                                <Spin spinning={spinning}>
                                    {
                                        resultat?.map(r=>{
                                            return(
                                                <Entreprise detail={r} />
                                            )
                                        })
                                    }
                                </Spin>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    )
}
export default page