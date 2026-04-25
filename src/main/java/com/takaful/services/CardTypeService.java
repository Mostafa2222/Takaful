package com.takaful.services;

import com.takaful.entities.CardType;
import com.takaful.repositories.CardTypeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardTypeService {

    private final CardTypeRepository repo;

    public CardTypeService(CardTypeRepository repo) {
        this.repo = repo;
    }

    public List<CardType> getAll() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
