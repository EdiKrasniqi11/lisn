import style from './Home.module.css'

export default function Home(){
    return(
        <div className={style.home}>
            <div className={style.announcementDiv}>
                Hi Edi. Ready for some music?
            </div>
        </div>
    )
}