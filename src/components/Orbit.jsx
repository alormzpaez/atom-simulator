import React, {useEffect, useState} from 'react'
import Sphere from './Sphere'
import AnimatedSphere from './AnimatedSphere'

const Orbit = ({n, actionOnClick, currentNInitial, currentNFinal, diffInY = null, handleSetYInitial = () => {}, handleSetYFinal = () => {}}) => {
    const [isClicked, setIsClicked] = useState(false)
    const [orbitOrder, setOrbitOrder] = useState('')

    const handleOnClick = () => {
        if (
            (currentNInitial && currentNFinal) &&
            (n !== currentNInitial) &&
            (n !== currentNFinal)
        ) {
            return
        }

        actionOnClick()

        if (isClicked) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }

    const handleSetOrbitOrder = () => {
        if (currentNInitial === n) {
            setIsClicked(true)
            setOrbitOrder('I')
        }
        else if (currentNFinal === n) {
            setIsClicked(true)
            setOrbitOrder('F')
        }
        else if (
            (!currentNInitial && !currentNFinal) ||
            (!currentNInitial && currentNFinal)
        ) {
            setOrbitOrder('I')
        }
        else if (
            (currentNInitial && !currentNFinal) ||
            (currentNInitial && currentNFinal)
        ) {
            setOrbitOrder('F')
        }
    }

    useEffect(() => {
        handleSetOrbitOrder()
    }, [currentNInitial, currentNFinal])

    return (
        <div className='relative flex items-center w-full gap-2 cursor-pointer group' onClick={handleOnClick}>
            <div className='flex w-full h-1 mx-auto my-4 bg-gray-700 border-0 rounded'>
            </div>
            <span>n={n}</span>
            <div className={'absolute hidden justify-center w-full group-hover:flex opacity-30'}>
                <Sphere show={orbitOrder}/>
            </div>
            {
                isClicked ? 
                    <div className={'flex absolute justify-center w-full group-hover:flex opacity-50'}>
                        <Sphere show={orbitOrder} isStatic={true} handleDimension={(num) => {
                            if (currentNInitial === n) {
                                handleSetYInitial(num)
                            }
                            else if (currentNFinal === n) {
                                handleSetYFinal(num)
                            }
                        }}/>
                    </div>
                :
                    null
            }

            {
                currentNInitial === n && diffInY !== null ?
                    <div className={'flex absolute justify-center w-full group-hover:flex'}>
                        <AnimatedSphere to={diffInY}/>
                    </div>
                :
                    null
            }
        </div>
    )
}

export default Orbit