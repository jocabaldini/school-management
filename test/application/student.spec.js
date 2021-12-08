const { expect } = require("chai")
const { fake } = require("sinon")
const sinon = require("sinon")

describe("School Management - Student Application Tests - application/student.js", function () {
  const sandbox = sinon.createSandbox()
  const dependencies = {
    domain: {
      studentExist: () => {},
      validateStudentCreation: () => {}
    },
    helpers: {
      makeReturn: () => {}
    },
    infrastructure: {
      studentRepository: {
        getStudents: () => {},
        createStudent: () => {},
        updateStudent: () => {},
        deleteStudent: () => {}
      }
    }
  }
  
  this.beforeEach(function () {
    // stub out the `hello` method
  })

  this.afterEach(function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore()
  })

  it("Testing getStudents function - Student not found! Should return code 404 and the right message", async () => {
    const studentId = 1
    const expectedCode = 404
    const expectedData =  {
      message: "Student not found"
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(false)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)
    sandbox.stub(dependencies.infrastructure.studentRepository, "getStudents")

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).getStudents(studentId)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.notCalled(dependencies.infrastructure.studentRepository.getStudents)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing getStudents function - Student founded! Should return code 200 and the same data of repository", async () => {
    const studentId = 1
    const expectedCode = 200
    const expectedData =  {
      "full_name": "Aluno 2",
      "address": {
        "street": "Rua 2",
        "number": "2",
        "complement": "",
        "neighborhood": "Bairro 2",
        "city": "Guaxupé",
        "state": "MG",
        "zip_code": "33333-333",
        "country": "Brasil"
      },
      "birthday": "07/07/2016",
      "guardians": [
        {
          "name": "Guardião 1 do Aluno 2"
        },
        {
          "name": "Guardião 2 do Aluno 2"
        }
      ],
      "id": 1
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(true)
    sandbox.stub(dependencies.infrastructure.studentRepository, "getStudents").withArgs(studentId).resolves(expectedData)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).getStudents(studentId)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.infrastructure.studentRepository.getStudents)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing getStudents function - Student UNDEFINED! Should return code 200 and the same data of repository", async () => {
    const expectedCode = 200
    const expectedData = [
      {
        "full_name": "Aluno 2",
        "address": {
          "street": "Rua 2",
          "number": "2",
          "complement": "",
          "neighborhood": "Bairro 2",
          "city": "Guaxupé",
          "state": "MG",
          "zip_code": "33333-333",
          "country": "Brasil"
        },
        "birthday": "07/07/2016",
        "guardians": [
          {
            "name": "Guardião 1 do Aluno 2"
          },
          {
            "name": "Guardião 2 do Aluno 2"
          }
        ],
        "id": 1
      }
    ]
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist")
    sandbox.stub(dependencies.infrastructure.studentRepository, "getStudents").withArgs(undefined).resolves(expectedData)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).getStudents()

    sandbox.assert.notCalled(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.infrastructure.studentRepository.getStudents)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing getStudents function - The repository trhows an err! Should throw the same err", async () => {
    const e = {
      message: "Error message"
    }
    sandbox.stub(dependencies.infrastructure.studentRepository, "getStudents").rejects(e);

    const student = require("../../application/student")
    const spyFunction = sandbox.spy(student(dependencies), "getStudents")
    spyFunction()
    spyFunction.threw(e)
  })

  it("Testing createStudent function - Validation failed! Should return code 400 and the right message", async () => {
    const fakeData = {}
    const expectedCode = 400
    const expectedData =  {
      message: "Student is not valid",
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "validateStudentCreation").withArgs(fakeData).resolves(false)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)
    sandbox.stub(dependencies.infrastructure.studentRepository, "createStudent")

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).createStudent(fakeData)

    sandbox.assert.calledOnce(dependencies.domain.validateStudentCreation)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.notCalled(dependencies.infrastructure.studentRepository.createStudent)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing createStudent function - Validation OK! Should return code 201 and the same data of repository", async () => {
    const fakeData = {
      "full_name": "Aluno 3",
      "address": {
        "street": "Rua 3",
        "number": "3",
        "complement": "Complemento 3",
        "neighborhood": "Bairro 3",
        "city": "Guaxupé",
        "state": "MG",
        "zip_code": "33333-333",
        "country": "Brasil"
      },
      "birthday": "07/07/2016",
      "guardians": [
          {
          "name": "Guardião 1 do Aluno 3"
        }
      ]
    }
    const expectedCode = 201
    const expectedData =  {
      "full_name": "Aluno 3",
      "address": {
        "street": "Rua 3",
        "number": "3",
        "complement": "Complemento 3",
        "neighborhood": "Bairro 3",
        "city": "Guaxupé",
        "state": "MG",
        "zip_code": "33333-333",
        "country": "Brasil"
      },
      "birthday": "07/07/2016",
      "guardians": [
          {
          "name": "Guardião 1 do Aluno 3"
        }
      ],
      "id": 1
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "validateStudentCreation").withArgs(fakeData).resolves(true)
    sandbox.stub(dependencies.infrastructure.studentRepository, "createStudent").withArgs(fakeData).resolves(expectedData)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).createStudent(fakeData)

    sandbox.assert.calledOnce(dependencies.domain.validateStudentCreation)
    sandbox.assert.calledOnce(dependencies.infrastructure.studentRepository.createStudent)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing createStudent function - The repository trhows an err! Should throw the same err", async () => {
    const e = {
      message: "Error message"
    }
    sandbox.stub(dependencies.infrastructure.studentRepository, "createStudent").rejects(e);

    const student = require("../../application/student")
    const spyFunction = sandbox.spy(student(dependencies), "createStudent")
    spyFunction()
    spyFunction.threw(e)
  })

  it("Testing updateStudent function - Student not found! Should return code 404 and the right message", async () => {
    const studentId = 1
    const expectedCode = 404
    const expectedData =  {
      message: "Student not found"
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(false)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)
    sandbox.stub(dependencies.domain, "validateStudentCreation")
    sandbox.stub(dependencies.infrastructure.studentRepository, "updateStudent")

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).updateStudent(studentId)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.notCalled(dependencies.infrastructure.studentRepository.updateStudent)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing updateStudent function - Student founded but validation failed! Should return code 400 and the right message", async () => {
    const studentId = 1
    const fakeData = {}
    const expectedCode = 400
    const expectedData =  {
      message: "Student is not valid",
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(true)
    sandbox.stub(dependencies.domain, "validateStudentCreation").withArgs(fakeData).resolves(false)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)
    sandbox.stub(dependencies.infrastructure.studentRepository, "updateStudent")

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).updateStudent(studentId, fakeData)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.domain.validateStudentCreation)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.notCalled(dependencies.infrastructure.studentRepository.updateStudent)
    sandbox.assert.match(studentReturn, expectedReturn)    
  })

  it("Testing updateStudent function - Student founded and validation OK! Should return code 200 and the same data of repository", async () => {
    const studentId = 1
    const fakeData = {
      "full_name": "Aluno 3",
      "address": {
        "street": "Rua 3",
        "number": "3",
        "complement": "Complemento 3",
        "neighborhood": "Bairro 3",
        "city": "Guaxupé",
        "state": "MG",
        "zip_code": "33333-333",
        "country": "Brasil"
      },
      "birthday": "07/07/2016",
      "guardians": [
          {
          "name": "Guardião 1 do Aluno 3"
        }
      ]
    }
    const expectedCode = 200
    const expectedData =  {
      "full_name": "Aluno 3",
      "address": {
        "street": "Rua 3",
        "number": "3",
        "complement": "Complemento 3",
        "neighborhood": "Bairro 3",
        "city": "Guaxupé",
        "state": "MG",
        "zip_code": "33333-333",
        "country": "Brasil"
      },
      "birthday": "07/07/2016",
      "guardians": [
          {
          "name": "Guardião 1 do Aluno 3"
        }
      ],
      "id": studentId
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(true)
    sandbox.stub(dependencies.domain, "validateStudentCreation").withArgs(fakeData).resolves(true)
    sandbox.stub(dependencies.infrastructure.studentRepository, "updateStudent").withArgs(studentId, fakeData).resolves(expectedData)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).updateStudent(studentId, fakeData)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.domain.validateStudentCreation)
    sandbox.assert.calledOnce(dependencies.infrastructure.studentRepository.updateStudent)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing updateStudent function - The repository trhows an err! Should throw the same err", async () => {
    const e = {
      message: "Error message"
    }
    sandbox.stub(dependencies.infrastructure.studentRepository, "updateStudent").rejects(e);

    const student = require("../../application/student")
    const spyFunction = sandbox.spy(student(dependencies), "updateStudent")
    spyFunction()
    spyFunction.threw(e)
  })

  it("Testing deleteStudent function - Student not found! Should return code 404 and the right message", async () => {
    const studentId = 1
    const expectedCode = 404
    const expectedData =  {
      message: "Student not found"
    }
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(false)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)
    sandbox.stub(dependencies.infrastructure.studentRepository, "deleteStudent")

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).deleteStudent(studentId)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.notCalled(dependencies.infrastructure.studentRepository.deleteStudent)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing deleteStudent function - Student founded! Should return code 200 and the same data of repository", async () => {
    const studentId = 1
    const expectedCode = 200
    const expectedData =  true
    const expectedReturn = {
      "statusCode": expectedCode, 
      "data": expectedData
    }
    sandbox.stub(dependencies.domain, "studentExist").withArgs(studentId).resolves(true)
    sandbox.stub(dependencies.infrastructure.studentRepository, "deleteStudent").withArgs(studentId).resolves(expectedData)
    sandbox.stub(dependencies.helpers, "makeReturn").withArgs(expectedCode, expectedData).resolves(expectedReturn)

    const student = require("../../application/student")
    const studentReturn = await student(dependencies).deleteStudent(studentId)

    sandbox.assert.calledOnce(dependencies.domain.studentExist)
    sandbox.assert.calledOnce(dependencies.infrastructure.studentRepository.deleteStudent)
    sandbox.assert.calledOnce(dependencies.helpers.makeReturn)
    sandbox.assert.match(studentReturn, expectedReturn)
  })

  it("Testing deleteStudent function - The repository trhows an err! Should throw the same err", async () => {
    const e = {
      message: "Error message"
    }
    sandbox.stub(dependencies.infrastructure.studentRepository, "deleteStudent").rejects(e);

    const student = require("../../application/student")
    const spyFunction = sandbox.spy(student(dependencies), "deleteStudent")
    spyFunction()
    spyFunction.threw(e)
  })
})
