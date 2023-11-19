export class basicFormulaService {
    e = 1.6E-19
    E0 = 8.85E-12
    R = 1.097E7
    C = 3E8

    getRadius = (n) => {
        return 0.53E-10 * Math.pow(n, 2)
    }

    getPotentialEnergy = (n) => {
        let radius = this.getRadius(n)
        return (-1) * ((Math.pow(this.e, 2)) / (4 * Math.PI * this.E0 * radius))
    }
    
    getKineticEnergy = (n) => {
        let radius = this.getRadius(n)
        return ((Math.pow(this.e, 2)) / (8 * Math.PI * this.E0 * radius))
    }

    getPotentialEnergy = (n) => {
        let radius = this.getRadius(n)
        return (-1) * ((Math.pow(this.e, 2)) / (4 * Math.PI * this.E0 * radius))
    }

    getAttractiveEnergy = (n) => {
        let radius = this.getRadius(n)
        return ((Math.pow(this.e, 2)) / (4 * Math.PI * this.E0 * Math.pow(radius, 2)))
    }

    getTotalEnergy = (n) => {
        let radius = this.getRadius(n)
        return (-1) * ((Math.pow(this.e, 2)) / (8 * Math.PI * this.E0 * radius))
    }

    getVelocity = (n) => {
        let radius = this.getRadius(n)
        let frequency = this.getTurningFrequency(n)

        return 2 * Math.PI * radius * frequency
    }

    getTurningFrequency = (n) => {
        return 2 * this.R * this.C * (1 / Math.pow(n, 3))
    }
}