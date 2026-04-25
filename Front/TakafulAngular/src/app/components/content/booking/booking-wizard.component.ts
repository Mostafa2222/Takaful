import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlotService } from '../../../services/Common-Services/slot.service';
import { BookingService } from '../../../services/Common-Services/booking.service';
import { AreaService } from '../../../services/Common-Services/area.service';
import { CarService } from '../../../services/Common-Services/car.service';
import { AddressService } from '../../../services/Common-Services/address.service';
import { Slot } from '../../../DTO/Slot';
import { CreateBookingRequest } from '../../../DTO/CreateBookingRequest';

@Component({
  selector: 'app-booking-wizard',
  templateUrl: './booking-wizard.component.html'
})
export class BookingWizardComponent {
/*
  slots: Slot[] = [];

  areas: any[] = [];
  cars: any[] = [];
  addresses: any[] = [];
  form!: FormGroup;

constructor(
  private fb: FormBuilder,
  private slotService: SlotService,
  private bookingService: BookingService,
  private areaService: AreaService,
  private carService: CarService,
  private addressService: AddressService
) {
  this.form = this.fb.group({
    areaId: ['', Validators.required],
    carId: ['', Validators.required],
    addressId: ['', Validators.required],
    date: ['', Validators.required],
    timeSlot: ['', Validators.required],
    packageId: [''],
    serviceIds: [[]],
    notes: ['']
  });

  this.loadLookups();
}

  ngOnInit() {
  this.form.get('date')!.valueChanges.subscribe(date => {
    const areaId = this.form.get('areaId')?.value;
    if (!areaId || !date) return;
    this.loadSlots(areaId, date);
  });

  this.form.get('areaId')!.valueChanges.subscribe(areaId => {
    const date = this.form.get('date')?.value;
    if (!areaId || !date) return;
    this.loadSlots(areaId, date);
  });
}

  loadLookups() {
    this.areaService.getAreas().subscribe(a => {
    console.log('AREAS FROM API =>', a);
    this.areas = a;
  });
    this.carService.getMyCars().subscribe(c => this.cars = c);
    this.addressService.getMyAddresses().subscribe(a => this.addresses = a);
  }

  onDateChange() {
  const areaId = this.form.get('areaId')?.value;
  const date = this.form.get('date')?.value;

  if (!areaId || !date) return;

  this.loadSlots(areaId, date);
}


  loadSlots(areaId: string, date: string) {
    this.slotService
      .getSlots(date, date, areaId)
      .subscribe(slots => this.slots = slots);
  }

  selectSlot(timeSlot: string) {
  this.form.get('timeSlot')?.setValue(timeSlot);
}


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { carId, addressId, date, timeSlot, packageId, serviceIds, notes } = this.form.getRawValue();

    const req: CreateBookingRequest = {
      carId,
      addressId,
      bookingDate: date,
      timeSlot,
      ...(packageId ? { packageId } : {}),
      ...(serviceIds?.length ? { serviceIds } : {}),
      ...(notes ? { notes } : {})
    };

    // const req = {
    //   carId: this.form.controls.carId.value,
    //   addressId: this.form.controls.addressId.value,
    //   bookingDate: this.form.controls.date.value,
    //   timeSlot: this.form.controls.timeSlot.value,
    //   packageId: this.form.controls.packageId.value || undefined,
    //   serviceIds: this.form.controls.serviceIds.value ?? [],
    //   notes: this.form.controls.notes.value || undefined
    // };

    this.bookingService.createBooking(req).subscribe({
      next: () => alert('Booking confirmed 🎉'),
      error: err => alert(err?.error?.message ?? 'Something went wrong')
    });
  }

  get areaIdCtrl() {
  return this.form.get('areaId')!;
}

get dateCtrl() {
  return this.form.get('date')!;
}
*/
}
