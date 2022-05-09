import Head from 'next/head';
import { DashboardLayout } from '../../../components/DashboardLayout';
import {useRouter} from "next/router";
import useSWR from "swr";
import Single from "../../../components/student/pages/exam/Single";
import Loading from "../../../components/Loading";
import NextNProgress from "nextjs-progressbar";
import {useEffect, useRef} from "react";

const ExamId = () => {
    const router = useRouter()
    const { id } = router.query
    const random = useRef(Date.now())
    const { data: exam, mutate, error } = useSWR(id ? [`student/exam/start/${id}/`, random]: [], {
        revalidateOnFocus: false
    })
    const videoPreview = useRef(null)

    useEffect(() => {
        if(videoPreview.current){
            enableCamPrev()
            /*
            let options = {
                videoBitsPerSecond : 135000,
                mimeType: 'video/webm;codecs=vp9,opus',
            }

            const recorder = new MediaRecorder(window.stream, options)
            setMediaRecorder(recorder)
             */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exam?.description])

    if(error?.response?.status === 405)
        router.push(`/u/exam/details/${id}`)

    if(exam?.submitted){
        router.push(`/u/results/${id}`)
        return (
            <DashboardLayout title="Examination">
                <Loading/>
            </DashboardLayout>
        )
    }

    //camera
    async function enableCamPrev(){
        try{
            const constraints = {
                video: {
                    width: 640,
                    height: 480,
                }
            }
            await navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    window.stream = stream
                })
                .catch((er) => {
                    console.log(er)
                })

            //const preview = document.getElementById('cam-preview')
            videoPreview.current.srcObject = stream

        }catch (e){
            alert('Unable to start camera \n Please disable cameras on other tabs \n' + e)
        }
    }
    //end camera

    return (
        <>
            <NextNProgress height={3}/>
            <DashboardLayout title="Examination">
                <Head>
                    <title>
                        Examination
                    </title>
                </Head>
                {!exam ? <Loading/>
                    : <Single
                        school={exam}
                        mutate={mutate}
                        router={router}
                        id={id}
                        videoPreview={videoPreview}
                    />}
            </DashboardLayout>
        </>
    )
}

export default ExamId;
