export class spectroscopyService {
    getIssuedEnergy = (atomicNumber, nInitial, nFinal) => {
        return (1.097E7) * (Math.pow(atomicNumber, 2)) * (6.626E-34) * (3E8) * ((1 / (Math.pow(nFinal, 2))) - (1 / (Math.pow(nInitial, 2))))
    }

    getWavelength = (atomicNumber, nInitial, nFinal) => {
        return (1 / ((1.097E7) * (Math.pow(atomicNumber, 2)) * ((1 / (Math.pow(nFinal, 2))) - (1 / (Math.pow(nInitial, 2))))))
    }

    getEnergyFrequency = (issuedEnergy) => {
        return (issuedEnergy / 6.626E-34)
    }

    getSeries = (nFinal) => {
        switch (nFinal) {
            case 1:
                return 'Lyman'
            case 2:
                return 'Balmer'
            case 3:
                return 'Paschen'
            case 4:
                return 'Bracket'
            case 5:
                return 'Pfund'
            default:
                return ''
        }
    }

    getNFinal = (series) => {
        switch (series) {
            case 'Lyman':
                return 1
            case 'Balmer':
                return 2
            case 'Paschen':
                return 3
            case 'Bracket':
                return 4
            case 'Pfund':
                return 5
            default:
                return null
        }
    }
}