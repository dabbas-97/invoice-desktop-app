let db = { companies, contracts, invoices, receipts };

let company = {
  id: "<String>",
  name: "<String>",
  location: "<String>",
  phoneNumber: "<String>",
  concernedPerson: "<String>",
  email: "<String>",
};

let contract = {
  id: "<String>",
  companyId: "<String>",
  description: "<String>",
  duration: "<String>",
};

let invoice = {
  id: "<String>",
  invoiceNumber: "<Number>",
  amount: "<Number>",
  amountLetters: "<String>",
  creationDate: "<Date>",
  includeTax: "<Boolean>",
};
let receipt = {
  id: "<String>",
  receiptNumber: "<Number>",
  amount: "<Number>",
  amountLetters: "<String>",
  creationDate: "<Date>",
  isCheque: "<Boolean>",
  cheque: {
    chequeNumber: "<String>",
    chequeBank: "<String>",
    chequeBankBranch: "<String>",
    chequeDate: "<String>",
  },
};

let invoicesSteps = { number: "<Number>" };
let receiptsSteps = { number: "<Number>" };
