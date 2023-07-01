import style from './Home.module.css'
import Views from '../../Assets/Images/Views.jpg'

export default function Home(){
    return(
        <div className={style.home}>
            <div className={style.announcementDiv}>
                Hi Edi. Ready for some music?
            </div>
            <div className={style.playlistsContainer}>
                <h3>Your playlists</h3>
                <div className={style.playlists}>
                    <div className={style.playlist}>
                        <img src={Views} className={style.playlistImage}/>
                        <h3>Views</h3>
                    </div>
                    <div className={style.playlist}>
                        <img src={Views} className={style.playlistImage}/>
                        <h3>To Pimp a Butterfly</h3>
                    </div>
                    <div className={style.playlist}>
                        <img src={Views} className={style.playlistImage}/>
                        <h3>DAMN</h3>
                    </div>
                    <div className={style.playlist}>
                        <img src={Views} className={style.playlistImage}/>
                        <h3>Vince Staples</h3>
                    </div>
                </div>
            </div>
            
        </div>
    )
}