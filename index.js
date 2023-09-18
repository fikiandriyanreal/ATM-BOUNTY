document.addEventListener("DOMContentLoaded", function () {
  const accountHolderElement = document.getElementById("account-holder");
  const accountTypeElement = document.getElementById("account-type");
  const balanceElement = document.getElementById("balance");
  const amountElement = document.getElementById("amount");
  const actionDropdown = document.getElementById("action-dropdown");
  const submitButton = document.getElementById("submit-button");
  const messageElement = document.getElementById("message");

  let account = {
    accountHolder: "Fiki Andriyan",
    accountType: "Savings",
    balance: 1000.0,
  };

  function updateAccountInfo() {
    accountHolderElement.textContent = account.accountHolder;
    accountTypeElement.textContent = account.accountType;
    balanceElement.textContent = account.balance.toFixed(2);
  }

  updateAccountInfo();

  submitButton.addEventListener("click", function () {
    const selectedAction = actionDropdown.value;
    const amount = parseFloat(amountElement.value);

    try {
      switch (selectedAction) {
        case "deposit":
          if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid deposit amount.");
          }
          account.balance += amount;
          messageElement.textContent = "Deposit successful.";
          break;

        case "withdraw":
          if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid withdrawal amount.");
          }
          if (account.balance < amount) {
            throw new Error("Insufficient funds.");
          }
          account.balance -= amount;
          messageElement.textContent = "Withdrawal successful.";
          break;

        case "check-balance":
          messageElement.textContent = "Balance checked.";

          break;

        default:
          throw new Error("Invalid action.");
      }

      updateAccountInfo();
      amountElement.value = "";
    } catch (error) {
      messageElement.textContent = error.message;
    } finally {
      amountElement.value = "";
    }
  });
});
