package infrastructure.repositories;

import domain.entities.CharactersEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CharactersRepository implements PanacheRepositoryBase<CharactersEntity, String> {}
