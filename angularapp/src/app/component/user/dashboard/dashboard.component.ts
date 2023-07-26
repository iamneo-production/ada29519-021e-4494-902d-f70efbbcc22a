<app-user style="position: sticky; top: 0; z-index: 100;"></app-user>
<!-- POPUP MESSAGES -->
<div class="popup-container" *ngIf="successmessage">
  <span class="alert alert-success" role="alert">
    <i class="bi bi-check-circle-fill"></i> {{successmessage}}
  </span>
</div>
<div class="popup-container" *ngIf="errormessage">
  <span class="alert alert-danger" role="alert">
    <i class="bi bi-x-square-fill"></i> {{errormessage}}
  </span>
</div>

<body>
  
  <br>
  <br>
        <!-- TO SHOW SELECTED SERVICE CENTER -->
        <div class="cards">
          <div class="card">
            <img class="card_img" [src]="serviceimage" alt="Grid Image">
            <div class="plus">
              <p>+</p>
            </div>
            <h3 style="text-transform: capitalize; text-align: center;">{{serviceName}}</h3>
            <div class="line"></div>
            <p>Rating : {{ rating }}</p>
            <p><b>Mail :</b> {{ servicemailid }}</p>
            <p><b>Phone :</b> {{ servicePhone }}</p>
            <p><b>Description:</b> {{servicecenterdescription}}
            </p>
            <p><b>Timing :</b> 00:00-23:59</p>
            <p><b>Reviews</b></p>
            <p><app-carousel></app-carousel></p> 
          </div>
    <!-- FORM TO BOOK THE APPOINTMENT -->
          <div class="card">
            <h3 style="text-align: center;"> Enter Ac Details</h3>
            <div class="line"></div>
            <form [formGroup]="productdetails">

              <label><h5>Enter Name of AC</h5></label>
                <input class="form-control" style="margin: 10px; width: 90%;" type="text" placeholder="Enter the name of the AC" id="enterProductName" formControlName="productName"
                 [ngClass]="{'is-invalid': productdetails.controls['productName'].touched && (productdetails.hasError('required','productName')||productdetails.hasError('pattern','productName'))}" 
                 [ngClass]="{'is-valid': productdetails.controls['productName'].touched &&productdetails.controls['productModelNo'].valid }">
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['productName'].touched && productdetails.hasError('required','productName')">Product name is required</small>
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['productName'].touched && productdetails.hasError('pattern','productName')">Invalid Product Name</small>
          
              <br><label><h5>Enter the Model number of AC</h5></label>
                <input type="text"  class="form-control" style="margin: 10px; width: 90%;" placeholder="Enter the Model number of the AC" id="enterModelNo" formControlName="productModelNo"
                [ngClass]="{'is-invalid': productdetails.controls['productModelNo'].touched && (productdetails.hasError('required','productModelNo')||productdetails.hasError('pattern','productModelNo'))}"
                [ngClass]="{'is-valid': productdetails.controls['productModelNo'].touched &&productdetails.controls['productModelNo'].valid }">
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['productModelNo'].touched && productdetails.hasError('pattern','productModelNo')">Invalid Model Number</small>
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['productModelNo'].touched && productdetails.hasError('required','productModelNo')">Model Number is required</small>

              <br><label> <h5>Enter Date of Purchase of AC</h5> </label>
                <input type="date"  class="form-control" style="margin: 10px; width: 90%;" placeholder="Enter the Date of Purchase" id="enterDateOfPurchase" formControlName="dateOfPurchase" (change)="onDateSelected()" [max]="tdy"
                [ngClass]="{'is-invalid': productdetails.controls['dateOfPurchase'].touched && productdetails.hasError('required','dateOfPurchase')}"
                [ngClass]="{'is-valid': productdetails.controls['dateOfPurchase'].touched &&productdetails.controls['dateOfPurchase'].valid }">
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['dateOfPurchase'].touched && productdetails.hasError('required','dateOfPurchase')">Product Date Of Purchase is required</small>
              
              <br><label> <h5>Enter the Contact Number:</h5> </label>
                <input type="tel" class="form-control" style="margin: 10px; width: 90%;" placeholder="Enter the Contact Number" id="enterContactNumber" formControlName="contactNumber"
                [ngClass]="{'is-invalid': productdetails.controls['contactNumber'].touched && (productdetails.hasError('required','contactNumber')||productdetails.hasError('pattern','contactNumber'))}"
                [ngClass]="{'is-valid': productdetails.controls['contactNumber'].touched &&productdetails.controls['contactNumber'].valid }">
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['contactNumber'].touched && productdetails.hasError('required','contactNumber')">Contact Number is required</small>
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['contactNumber'].touched && productdetails.hasError('pattern','contactNumber')">Invalid  Contact Number (10 digits only)</small>
              
              <br><label><h5>Enter Problem Description of AC:</h5> </label>
              <textarea class="form-control" style="margin: 10px; width: 90%;" placeholder="Enter Problem of the AC" id="enterProblem" formControlName="problemDescription"
              [ngClass]="{'is-invalid': productdetails.controls['problemDescription'].touched && (productdetails.hasError('required','problemDescription')||productdetails.hasError('pattern','problemDescription'))}"
              [ngClass]="{'is-valid': productdetails.controls['problemDescription'].touched &&productdetails.controls['problemDescription'].valid }"></textarea>
              <span class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['problemDescription'].touched && productdetails.hasError('required','problemDescription')">Problem Description is required</span>
              <span class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['problemDescription'].touched && productdetails.hasError('pattern','problemDescription')">Only Alphabets allowed</span>


              <br><label> <h5>Book the Slots</h5> </label>
              <div class="slots">
                <select id="selectDate"class="form-control" style="margin: 10px; width: 90%;" formControlName="date" placeholder="Choose the DATE"
                [ngClass]="{'is-valid': productdetails.controls['date'].touched &&productdetails.controls['date'].valid }"
                [ngClass]="{'is-invalid': productdetails.controls['date'].touched && (productdetails.hasError('required','date')||productdetails.hasError('pattern','date'))}">
                  <option value="" disabled selected>Select a date</option>
                  <ng-container *ngFor="let slot of availableSlots">
                    <option [value]="slot.date">{{ slot.date }}</option>
                  </ng-container>
                </select>
                <small class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['date'].touched && productdetails.hasError('required', 'date')"> Date is required</small>

                <select id="selectTime" class="form-control" style="margin: 10px; width: 90%;" formControlName="time" placeholder="Choose the time slot"
                [ngClass]="{'is-valid': productdetails.controls['time'].touched &&productdetails.controls['time'].valid }"
                [ngClass]="{'is-invalid': productdetails.controls['time'].touched && (productdetails.hasError('required','time')||productdetails.hasError('pattern','time'))}">
                  <option value="" disabled selected>Select a time</option>
                  <ng-container *ngFor="let slot of availableSlots">
                    <ng-container *ngIf="slot.date === productdetails.value.date">
                      <option *ngFor="let timeSlot of slot.times" [value]="timeSlot.time"
                        [disabled]="timeSlot.isBooked">
                        {{ timeSlot.time }}
                      </option>
                    </ng-container>
                  </ng-container>
                </select>
                <p class="text-danger" style="margin: 10px;"*ngIf="productdetails.controls['time'].touched && productdetails.controls['time'].hasError('required')">  Time is required </p>
              </div>
              <button class="btn btn-primary" style="margin-left: 5%;margin-bottom: 5%; width: 90%;" (click)="onbook();showFieldErrors()" type="submit" id="bookButton">
                <span *ngIf="book === 'book'">BOOK APPOINTMENT</span>
                <span *ngIf="book !== 'book'">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </span>
              </button>
            </form>
          </div>
        </div>
</body>