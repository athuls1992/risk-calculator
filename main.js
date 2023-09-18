document.getElementById('myForm').reset();
const annualRevenueInput = document.querySelector(".annual-rev");
const interestRateInput = document.querySelector('#industry');
const empCountInput = document.querySelector('#employee');

const avgCostValue = document.querySelector(".avg-cost .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value ");

const calculateBtn = document.querySelector(".calculate-btn");

let annualRevenue = parseFloat(annualRevenueInput.value);
let interestRate = parseFloat(interestRateInput.value);
let empCount = parseFloat(empCountInput.value);
let avgCost = parseFloat(empCountInput.value);

const riskRatio = 0.59;

let myChart;

const checkValues = () => {
  let annualRevenueValue = annualRevenueInput.value;
  let interestRateValue = interestRateInput.value;
  let empCountValue = empCountInput.value;

  // if (this.annualRevenueInput === '0') {
  //   document.getElementById('emivalue').innerHTML = '';
  //   }

  let regexNumber = /^[0-9]+$/;
  if (!annualRevenueValue.match(regexNumber)) {
    annualRevenueInput.value = "";
  }

  if (!empCountValue.match(regexNumber)) {
    empCountInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Financial Risk", "Cost based on industry"],
      datasets: [
        {
          label: ["Financial Risk"],
          data: [totalInterestPayableValue,avgCost],
          backgroundColor: ["#4d42f2", "#040404"],
          borderWidth: 0,
        },
      ],
    },
    // options: {
    //   scales: {
    //     x: {
    //       stacked: true
    //   },
    //   y: {
    //       stacked: true
    //   }
    //   }
    // },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = avgCost;
  myChart.update();
};

const refreshInputValues = () => {
  annualRevenue = parseFloat(annualRevenueInput.value);
  interestRate = parseFloat(interestRateInput.value);
  empCount = parseFloat(empCountInput.value);
  interest = interestRate * (empCount/100);
};
const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  
  let employeeRatio = empCount/100;
  let emi = interestRate * employeeRatio;
  // console.log(emi);
  return emi;
};

const updateData = (emi) => {
  avgCost = Math.round(emi)
  avgCostValue.innerHTML = Math.round(emi).toLocaleString();

  let totalAmount = Math.round(empCount * emi);
  totalAmountValue.innerHTML = totalAmount.toLocaleString();

  let totalInterestPayable = Math.round(emi * riskRatio);
  totalInterestValue.innerHTML = totalInterestPayable.toLocaleString();
  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  var emi = calculateEMI();
  updateData(emi);
};

init();


// var calculatedEMI = document.getElementById('emivalue').innerHTML;

calculateBtn.addEventListener("click", init);

function sendIt() {
  var endpoint = 'https://eoa8in2k3yelhfr.m.pipedream.net';
var formData = {
  domain_name: $(".domain-type").val(),
  industry: $("#industry").find(":selected").text(),
  revenue: $(".annual-rev").val(),
  empCapacity: $("#employee").find(":selected").text(),
}
  $.ajax({
      type: "POST",
      url: endpoint,
      data: formData,
      dataType: "json"
  });
}

function validateForm() {
  let x = document.forms["myForm"]["field"].value;
  if (x == "") {
    alert("Please fill in your email and try again!");
    return false;
  }
}

jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$( "#myform" ).validate({
  rules: {
    field: {
      required: true,
      url: true,
    }
  }
});


function validateEmail(email) {
  // Regular expression to match only organizational email domains
  const allowedDomainsRegex = /@(?!me\.com|mac\.com|icloud\.com|gmail\.com|googlemail\.com|hotmail\.com|live\.com|msn\.com|outlook\.com|yahoo\.com|ymail\.com|aol\.com|google\.com|test\.com|xyz\.com|zoho\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!allowedDomainsRegex.test(email)) {
      alert("Please enter a valid organizational email address.");
      document.getElementById("fields").value = "";
  }
}

// function ValidURL(str) {
//   var regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
//   if (!regex.test(str)|| (str.length <= 3)) {
//       alert("Please enter valid URL.");
//       return false;
//   }
// }
