//package com.takaful.services;
//
//import com.takaful.dtos.CityDto;
//import com.takaful.dtos.CountryDto;
//import com.takaful.dtos.LocationDto;
//import com.takaful.dtos.StateDto;
//import com.takaful.mappers.CityMapper;
//import com.takaful.mappers.CountryMapper;
//import com.takaful.mappers.LocationMapper2;
//import com.takaful.mappers.StateMapper;
//import com.takaful.repositories.CityRepository;
//import com.takaful.repositories.CountryRepository;
//import com.takaful.repositories.StateRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class Location2Service {
//
//    private final CityRepository cityRepo;
//    private final StateRepository stateRepo;
//    private final CountryRepository countryRepo;
//
//    private final CityMapper cityMapper;
//    private final StateMapper stateMapper;
//    private final CountryMapper countryMapper;
//    private final LocationMapper2 locationMapper;
//
//    public List<CountryDto> getCountries() {
//        return countryMapper.toDtoList(countryRepo.findAll());
//    }
//
//    public List<StateDto> getStates(String countryCode) {
//        return stateMapper.toDtoList(
//                stateRepo.findByCountryCode(countryCode)
//        );
//    }
//
//    public List<CityDto> getCities(String stateCode) {
//        return cityMapper.toDtoList(
//                cityRepo.findByAdmin1Code(stateCode)
//        );
//    }
//
//    public List<LocationDto> search(String query) {
//
//        if (query == null || query.trim().isEmpty()) {
//            return List.of();
//        }
//
//        String q = query.trim().toLowerCase();
//
//        List<LocationDto> result = new ArrayList<>();
//
//        // 🔹 Countries
//        countryRepo.search(q)
//                .stream()
//                .map(locationMapper::fromCountry)
//                .forEach(result::add);
//
//        // 🔹 States
//        stateRepo.search(q)
//                .stream()
//                .map(locationMapper::fromState)
//                .forEach(result::add);
//
//        // 🔹 Cities
//        cityRepo.search(q)
//                .stream()
//                .map(locationMapper::fromCity)
//                .forEach(result::add);
//
//        return result.stream()
//                .sorted(Comparator.comparing(LocationDto::getNameEn))
//                .limit(20)
//                .toList();
//    }
//}
