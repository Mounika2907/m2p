import React, { useEffect } from 'react';
// import React from 'react'
import useSound from 'use-sound';
// import mySound from '/assets/audio/tone_new.np3';
import mySound from '../../../audio/tone_new.mp3'
// import mySound from '../../../../public/assets/audio/tone_new.mp3';




const SoundCalling = (props) => {
    const [playSound] = useSound(mySound);

    // useEffect(() => {
    //     // document.getElementById("myCheck").click()
    //     // playSound
    //     // props.play ? playSound() : null
    //     // return () => {
    //     //     cleanup
    //     // }
    // }, [])

    return (
        <>
        {/* // <button id="myCheck" onClick={playSound}>{console.log('clicke')}</button> */}
            {
                props.play ? (

                    <audio autoPlay>
                        <source src={playSound} />

                    </audio>
                ) : null
            }
        </>

    )
}

export default SoundCalling;

    //    props.play ?  <button onClick={playSound}>play</button> : null