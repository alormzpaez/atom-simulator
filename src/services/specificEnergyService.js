export class specificEnergyService {
    constant = 21.7896072E-19 // 13.6 eV but in Joules

    getLevelEnergy = (Z, n) => {
        return (-1) * ((this.constant * Math.pow(Z, 2))/ Math.pow(n, 2))
    }

    getExcitationEnergy = (Z, n) => {
        return this.constant * Math.pow(Z, 2) * (1 - (1 / Math.pow(n, 2)))
    }

    getBindingEnergy = (Z, n) => {
        return (this.constant * Math.pow(Z, 2)) / (Math.pow(n, 2))
    }
}