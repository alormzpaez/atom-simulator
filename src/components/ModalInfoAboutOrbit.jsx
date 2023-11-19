import React, { useEffect, useState } from 'react'
import Table from './Table'
import { specificEnergyService } from '../services/specificEnergyService'
import { basicFormulaService } from '../services/basicFormulaService'

const ModalInfoAboutOrbit = ({Z, n = null}) => {
    const [specificEnergies, setSpecificEnergies] = useState({
        'Energía de nivel (En)': null,
        'Energía de excitación (Ee)': null,
        'Energía de enlace (E0)': null,
    })
    const [basicFormulas, setBasicFormulas] = useState({
        'Radio de la órbita (r)': null,
        'Energía potencial (U)': null,
        'Energía cinética (K)': null,
        'Fuerza de atracción entre el electrón y el protón (F)': null,
        'Energía total del átomo (K + U)': null,
        'Velocidad a la que gira el electrón alrededor del núcleo (V)' : null,
        'Frecuencia de giro (f)': null,
    })

    useEffect(() => {
        if (n) {
            setSpecificEnergies({
                'Energía de nivel (En)': (new specificEnergyService()).getLevelEnergy(Z, n).toExponential(4) + ' J',
                'Energía de excitación (Ee)': (new specificEnergyService()).getExcitationEnergy(Z, n).toExponential(4) + ' J',
                'Energía de enlace (E0)': (new specificEnergyService()).getBindingEnergy(Z, n).toExponential(4) + ' J',
            })

            setBasicFormulas({
                'Radio de la órbita (r)': (new basicFormulaService()).getRadius(n).toExponential(4) + ' m',
                'Energía potencial (U)': (new basicFormulaService()).getPotentialEnergy(n).toExponential(4) + ' J',
                'Energía cinética (K)': (new basicFormulaService()).getKineticEnergy(n).toExponential(4) + ' J',
                'Fuerza de atracción entre el electrón y el protón (F)': (new basicFormulaService()).getAttractiveEnergy(n).toExponential(4) + ' N',
                'Energía total del átomo (K + U)': (new basicFormulaService()).getTotalEnergy(n).toExponential(4) + ' J',
                'Velocidad a la que gira el electrón alrededor del núcleo (V)' : (new basicFormulaService()).getVelocity(n).toExponential(4) + ' m/s',
                'Frecuencia de giro (f)': (new basicFormulaService()).getTurningFrequency(n).toExponential(4) + ' Hz'
            })
        }
    }, [n])

    return (
        <div>
            <span>Formulas para la órbita {n}°:</span>
            <Table data={basicFormulas}/>

            <br />

            <span>Energías específicas para la órbita {n}°:</span>
            <Table data={specificEnergies}/>
        </div>
    )
}

export default ModalInfoAboutOrbit