module.exports = (dependencies) => ({
  studentExist: dependencies.infrastructure.studentRepository.studentExist,
  validateStudentCreation: (student) => {
    if (student.full_name.length === 0) {
      return false
    }
    const address = student.address
    if (!(!!address && address.constructor === Object)) {
      return false
    }
    if (address.street.length === 0) {
      return false
    }
    if (address.number.length === 0) {
      return false
    }
    if (address.complement.length === 0) {
      return false
    }
    if (address.neighborhood.length === 0) {
      return false
    }
    if (address.city.length === 0) {
      return false
    }
    if (address.state.length === 0) {
      return false
    }
    if (address.zip_code.length === 0) {
      return false
    }
    if (address.country.length === 0) {
      return false
    }
    if (student.birthday.length === 0) {
      return false
    }
    const guardians = student.guardians
    if (
      !(!!guardians && guardians.constructor === Array) ||
      guardians.length === 0
    ) {
      return false
    }
    for (let i = 0; i < guardians.length; i++) {
      const guardian = guardians[i]
      if (guardian.name.length === 0) {
        return false
      }
    }
    return true
  },
})
