//package com.takaful.controllers;
//
//import com.takaful.dtos.CityDto;
//import com.takaful.dtos.CountryDto;
//import com.takaful.dtos.LocationDto;
//import com.takaful.dtos.StateDto;
//import com.takaful.entities.City;
//import com.takaful.entities.Country;
//import com.takaful.entities.State;
//import com.takaful.services.Location2Service;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
////@RestController
////@RequestMapping("/api/locations")
////@RequiredArgsConstructor
////public class LocationController {
////
////    private final LocationService service;
////
////    @GetMapping("/search")
////    public List<LocationDto> search(@RequestParam String query) {
////        return service.search(query);
////    }
////    @GetMapping("/countries")
////    public List<CountryDto> getCountries() {
////        return service.getCountries();
////    }
////
////    @GetMapping("/states/{countryCode}")
////    public List<StateDto> getStates(@PathVariable String countryCode) {
////        return service.getStates(countryCode);
////    }
////
////    @GetMapping("/cities/{admin1Code}")
////    public List<CityDto> getCities(@PathVariable String admin1Code) {
////        return service.getCities(admin1Code);
////    }
////}
