import { useEffect, useState } from 'react'
import Semisphere from './components/Semisphere'
import Sphere from './components/Sphere'
import Orbit from './components/Orbit'
import { spectroscopyService } from './services/spectroscopyService'
import Table from './components/Table'
import Modal from './components/Modal'
import useModal from './components/useModal'
import ModalInfoAboutOrbit from './components/ModalInfoAboutOrbit'
import Modal4XL from './components/Modal4XL'
import { animated, useSpring } from '@react-spring/web'

function App() {
  const [nInitial, setNInitial] = useState(null)
  const [nFinal, setNFinal] = useState(null)
  const [atomicNumber, setAtomicNumber] = useState(1)

  const [diffBetweenOrbits, setDiffBetweenOrbits] = useState(0)
  const [kindOfEnergy, setKindOfEnergy] = useState('')
  const [issuedEnergy, setIssuedEnergy] = useState(0)
  const [energyFrequency, setEnergyFrequency] = useState(0)
  const [wavelength, setWavelength] = useState(0)
  const [spectralLine, setSpectralLine] = useState('')

  const [isOpenModalAtomicNumber, openModalAtomicNumber, closeModalAtomicNumber] = useModal(false);
  const [isOpenModalSpectralLine, openModalSpectralLine, closeModalSpectralLine] = useModal(false);
  const [isOpenModalNFinal, openModalNFinal, closeModalNFinal] = useModal(false);
  const [isOpenModalNInitial, openModalNInitial, closeModalNIInitial] = useModal(false);
  const [isOpenModalInfo, openModalInfo, closeModalInfo] = useModal(true);
  const [yInitial, setYInitial] = useState(null)
  const [yFinal, setYFinal] = useState(null)
  const [diffInY, setDiffInY] = useState(null)
  const [x, setX] = useState(null)

  const setCurrentOrbit = (n) => {
    if (nInitial === n) {
      setNInitial(null)
      setYInitial(null)
    }
    else if (nFinal === n) {
      setNFinal(null)
      setYFinal(null)
    }
    else if (!nInitial) {
      setNInitial(n)
    } else if (!nFinal) {
      setNFinal(n)
    }
  }

  const setCalculations = () => {
    setDiffBetweenOrbits(Math.abs(nInitial - nFinal))

    if ((nInitial - nFinal) < 0) {
      setKindOfEnergy('Suministrada')
    } else {
      setKindOfEnergy('Emitida')
    }
  }

  const setSpectroscopyCalculations = () => {
    let service = new spectroscopyService()
    let currentIssuedEnergy = service.getIssuedEnergy(atomicNumber, nInitial, nFinal)

    setIssuedEnergy(currentIssuedEnergy)
    setWavelength(service.getWavelength(atomicNumber, nInitial, nFinal))
    setEnergyFrequency(service.getEnergyFrequency(currentIssuedEnergy))

    // get spectral line
    if (diffBetweenOrbits > 0) {
      setSpectralLine(diffBetweenOrbits + '° línea de ' + service.getSeries(nFinal))
    }
  }

  const voidCalculations = () => {
    setDiffBetweenOrbits(0)
    setKindOfEnergy('')
    setIssuedEnergy(0)
    setEnergyFrequency(0)
    setWavelength(0)
    setSpectralLine('')
  }

  const onSubmitModalSpectralLine = (e) => {
    e.preventDefault()
    let text = e.target.elements.line.value
    let match = text.match(/\d° línea de (.+)/)
    let word = ''

    if (match) {
      word = match[1]
    }

    let service = new spectroscopyService()
    let nFinal = service.getNFinal(word)
    
    if (!match) {
      alert('Introduce un dato correcto')
      return
    }
    
    setNFinal(nFinal)

    match = text.match(/(\d)° línea de/)
    word = ''

    if (match) {
      word = match[1]
    }
    else {
      alert('Introduce un dato correcto')
      return
    }

    let num = parseInt(word)

    setNInitial(nFinal + num)
    closeModalSpectralLine()
  }

  const handleAnimation = () => {
    console.log(animationInitial, animationFinal);
  }

  useEffect(() => {
    if (nInitial && nFinal) {
      setCalculations()
    } else {
      voidCalculations()
    }
  }, [nInitial, nFinal])

  useEffect(() => {
    if (kindOfEnergy == 'Emitida') {
      setSpectroscopyCalculations()
    }
  }, [kindOfEnergy])

  useEffect(() => {
    if (yInitial !== null && yFinal !== null) {
      setDiffInY(yFinal - yInitial)
    } else {
      setDiffInY(null)
    }
  }, [yInitial, yFinal])

  return (
    <>
      <header className='flex justify-end px-10 py-5'>
        <button class="text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 self-center" onClick={openModalInfo}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <span class="sr-only">Group</span>
        </button>
      </header>
      <main className='flex items-center min-h-screen px-20 pb-5 text-gray-300 justify-evenly bg-slate-950'>
        <div className='flex flex-col w-auto'>
          <Table data={{
            'Órbita inicial': nInitial,
            'Órbita final': nFinal,
            'Lineas de diferencia': diffBetweenOrbits,
            '¿Es energía emitida o suministrada?': kindOfEnergy,
            'Número atómico (Z)': atomicNumber,
            'Energía emitida': issuedEnergy.toExponential(4) + ' J',
            'Frecuencia de la energía emitida': energyFrequency.toExponential(4) + ' Hz',
            'Longitud de onda': wavelength.toExponential(4) + ' m',
            'Linea espectral emitida': spectralLine
          }} onOpenModalAtomicNumber={openModalAtomicNumber} onOpenModalSpectralLine={openModalSpectralLine} onOpenModalNFinal={openModalNFinal} onOpenModalNInitial={openModalNInitial}/>
        </div>
        <div className='flex items-center justify-center flex-grow w-auto'>
          <span>
            {
              kindOfEnergy == 'Emitida' ?
                <svg className='h-40' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                </svg>
              : kindOfEnergy == 'Suministrada' ?
                <svg className='h-40' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                </svg>
              :
                null
            }
          </span>
          <div className='flex flex-col items-center justify-center w-1/3 h-auto'>
            <Orbit n={'...'} currentNInitial={nInitial} currentNFinal={nFinal} />
            <Orbit n={8} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(8)}/>
            <Orbit n={7} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(7)}/>
            <Orbit n={6} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(6)}/>
            <Orbit n={5} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(5)}/>
            <Orbit n={4} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(4)}/>
            <Orbit n={3} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(3)}/>
            <Orbit n={2} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(2)}/>
            <Orbit n={1} diffInY={diffInY} handleSetYInitial={(num) => setYInitial(num)} handleSetYFinal={(num) => setYFinal(num)} currentNInitial={nInitial} currentNFinal={nFinal} actionOnClick={() => setCurrentOrbit(1)}/>
            <Semisphere />
          </div>
        </div>
        
        <Modal isOpen={isOpenModalInfo} onClose={closeModalInfo} title={'Información del equipo y del simulador'}>
          <div className='px-2'>
            <p>Equipo #6. Física IV Ordinaria No Escolarizada. Tema: El Átomo. Integrantes:</p>
            <br />
            <ul className='list-none'>
              <li><b>Magaly Anahí Bringas Velasco</b> – 2128024</li>
              <li><b>Ángel Gabriel Hernández Hernández</b> – 2127874</li>
              <li><b>Alonso Ramírez Páez</b> – 2127873</li>
              <li><b>Carlos Romero Alonso</b> – 1982652</li>
              <li><b>Jorge Sergio Altamirano Oviedo</b> – 2127954</li>
            </ul>

            <br />
            <p>El siguiente simulador realiza todas las fórmulas necesarias internamente, para así conocer información sobre un átomo de hidrógeno. Ústed podría saber:</p>
            <ul className='list-disc'>
              <li>las energías emitidas o suministradas en el átomo</li>
              <li>su espectroscopía</li>
              <li>datos sobre sus órbitas</li>
              <li>y más...</li>
            </ul>

            <br />
            <p>Por el momento, solo es posible insertar información mediante:</p>
            <ul className='list-disc'>
              <li>selección de órbitas</li>
              <li>entrada de línea espectral</li>
            </ul>
            <br />
            <p>Además que todas las unidades utilizadas están en el Sistema Internacional de Unidades (SI). Así como que <b>solo es posible visualizarlo correctamente desde una PC o Laptop.</b> Pero esperamos que con futuras actualizaciones, el simulador tenga muchas más características y posibilidades.</p>
          </div>
        </Modal>

        <Modal isOpen={isOpenModalAtomicNumber} onClose={closeModalAtomicNumber} title={'Número atómico (Z)'}>
          <span>Dado que durante la lección se abordó el uso exclusivo de un átomo de hidrógeno, esta circunstancia justifica que el número atómico (Z) sea invariablemente igual a 1.</span>
        </Modal>

        <Modal isOpen={isOpenModalSpectralLine} onClose={closeModalSpectralLine} title={'Linea espectral emitida'}>
          <p>* Sigue el sig. formato para escribir la línea espectral emitida: "3° línea de Paschen", "2° línea de Bracket", etc.</p>
          <br />
          <form action="#" class="" onSubmit={onSubmitModalSpectralLine}>
            <div class="flex flex-col gap-4 mb-4 grid-cols-2 justify-center">
              <div class="col-span-2">
                <label for="line" class="block mb-2 text-sm font-medium text-white">Línea espectral emitida</label>
                <input defaultValue={spectralLine} type="text" name="line" id="line" class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Introduce información aquí..." required="" />
              </div>
              <button type="submit" class="text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 self-center">
                  Guardar información
                </button>
            </div>
          </form>
        </Modal>

        <Modal4XL isOpen={isOpenModalNFinal} onClose={closeModalNFinal} title={'Información para la órbita final'}>
          <ModalInfoAboutOrbit n={nFinal} Z={atomicNumber} />
        </Modal4XL>

        <Modal4XL isOpen={isOpenModalNInitial} onClose={closeModalNIInitial} title={'Información para la órbita inicial'}>
          <ModalInfoAboutOrbit n={nInitial} Z={atomicNumber} />
        </Modal4XL>
      </main>
    </>
  )
}

export default App
