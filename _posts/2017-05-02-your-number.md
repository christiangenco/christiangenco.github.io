---
title: Your Number
image:
image_small:
excerpt: How much money is enough?
---

<div id="retirementCalculations">
  <p>
    If you spend $<span data-var="spending" class="TKAdjustableNumber" data-min="1" data-max="100">k/year</span> and make $<span data-var="income" class="TKAdjustableNumber" data-min="1" data-max="500">k/year</span> after taxes, you're saving <span data-var="savingRate">%</span> of your income ($<span data-var="saving">k/year</span>).
  </p>
  <p>
    Put another way: for every year you work, you're earning <span data-var="earnedYears"> years</span> time off.
  </p>
  <p>
    If you can put your money in an asset that earns <span data-var="interestRate" class="TKAdjustableNumber" data-min="1" data-max="12">%</span> interest, you need <span data-var="indefiniteMultiplier">x</span> your expenses (<b>$<span data-var="savingsTarget">k</span></b>) to live indefinitely on interest. At the rate you're saving and earning interest, it will take about <span data-var="yearsToRetirement"> years</span> to save $<span data-var="savingsTarget">k</span><!--(vs. <span data-var="yearsToRetirementNoInterest"> years</span> with no interest)--><!-- (if you currently have $<span data-var="alreadySaved" class="TKAdjustableNumber" data-min="0" data-max="1000">k</span> saved)-->.
  </p>
  <p>
    Alternatively, if you start a business that makes $<span data-var="customerCharge" class="TKAdjustableNumber" data-min="1" data-max="500"></span> profit per customer per month, you'll only need <b><span data-var="neededCustomers"> customers</span></b> to cover your living expenses.
  </p>
</div>

<link rel="stylesheet" href="/css/TangleKit.css" type="text/css">
<script type="text/javascript" src="/js/tangle.js">
</script>
<script type="text/javascript">
var tangle = new Tangle(document.getElementById("retirementCalculations"), {
  initialize: function() {
    this.spending = 20;
    this.income = 60;
    this.interestRate = 4;
    this.alreadySaved = 0;
    this.customerCharge = 100;
  },
  update: function() {
    // this.calories = this.cookies * this.caloriesPerCookie;
    this.saving = this.income - this.spending;
    this.savingRate = Math.round(this.saving / this.income * 100);
    this.earnedYears = Math.round(this.saving / this.spending * 10) / 10;
    this.indefiniteMultiplier = Math.round(100 / this.interestRate);
    this.savingsTarget = this.indefiniteMultiplier * this.spending;

    var i = this.interestRate / 100;
    // this isn't quite right, since alreadySaved will also earn interest during yearsToRetirement
    var p_0 = this.savingsTarget;
    var p = this.spending;
    var r = this.savingRate / 100;
    this.yearsToRetirement = Math.round(
      Math.log(1 + i * p_0 / p * (1 - r) / r) / Math.log(1 + i)
    );

    this.yearsToRetirementNoInterest = (this.savingsTarget / this.saving);
    this.yearsToRetirementNoInterest = Math.round(this.yearsToRetirementNoInterest * 10)/10;

    if (this.spending >= this.income) {this.yearsToRetirement = this.yearsToRetirementNoInterest = "forever"};

    // var A = this.savingsTarget * 1000;
    // var r = this.interestRate / 100;
    // var P = 0;
    // console.log({ A, r, P });
    // this.yearsToRetirement = Math.log(A) / (Math.log(P * Math.E) * r);

    this.neededCustomers = Math.ceil(
      this.spending / 12 * 1000 / this.customerCharge
    );
  }
});
</script>
