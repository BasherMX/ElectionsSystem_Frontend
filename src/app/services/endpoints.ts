// endpoints.ts
export const Endpoints = {
  // - - - - - PublicRoutes - - - - -
  public: {
    login: '/public/loginUser',
    verifyAccount: (code: string) => `/public/verifyAccount/${code}`
  },

  // - - - - - AuthRoutes - - - - -
  user: {
    getAllEnable: '/user/getAllEnable',
    getAllDisable: '/user/getAllDisable',
    getById: (id: string) => `/user/getById/${id}`,
    create: '/user/create',
    update: (id: string) => `/user/update/${id}`,
    disable: (id: string) => `/user/disable/${id}`,
    enable: (id: string) => `/user/enable/${id}`,
  },
  vote: {
    verifyCanVote: '/vote/verifyCanVotate',
    getBallotsByExerciseId: '/vote/getBallotsByExerciseId',
    voteForCandidate: '/vote/voteForCandidate',
  },
  realTime: {
    getBallotsByExerciseId: '/realTime/getBallotsByExerciseId',
  },
  politicalParty: {
    getAllEnable: '/politicalParty/getAllEnable',
    getAllDisable: '/politicalParty/getAllDisable',
    getById: (id: string) => `/politicalParty/getById/${id}`,
    create: '/politicalParty/create',
    update: (id: string) => `/politicalParty/update/${id}`,
    disable: (id: string) => `/politicalParty/disable/${id}`,
    enable: (id: string) => `/politicalParty/enable/${id}`,
  },
  // qrCode: {
  //   getElectorQrById: (id: string) => `/qrCode/getElectorQrById/${id}`,
  //   getVotationQrCode: '/qrCode/getVotationQrCode',
  // },
  elector: {
    getAllEnable: '/elector/getAllEnable',
    getAllDisable: '/elector/getAllDisable',
    getById: (id: string) => `/elector/getById/${id}`,
    create: '/elector/create',
    update: (id: string) => `/elector/update/${id}`,
    disable: (id: string) => `/elector/disable/${id}`,
    enable: (id: string) => `/elector/enable/${id}`,
  },
  ballot: {
    getAllEnable: '/ballot/getAllEnable',
    getAllDisable: '/ballot/getAllDisable',
    getById: (id: string) => `/ballot/getById/${id}`,
    create: '/ballot/create',
    disable: (id: string) => `/ballot/disable/${id}`,
    enable: (id: string) => `/ballot/enable/${id}`,
  },
  exercise: {
    getAllEnable: '/exercise/getAllEnable',
    getAllDisable: '/exercise/getAllDisable',
    getById: (id: string) => `/exercise/getById/${id}`,
    create: '/exercise/create',
    update: (id: string) => `/exercise/update/${id}`,
    disable: (id: string) => `/exercise/disable/${id}`,
    enable: (id: string) => `/exercise/enable/${id}`,
    notAssigned: '/exercise/notAssigned',
  },
  file: {
    upload: '/file/upload',
  },
};
