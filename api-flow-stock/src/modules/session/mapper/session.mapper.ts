import { UserMapper } from "src/modules/users/mapper/users.domain";
import Session from "../entities/session.entity";

export class SessionMapper {
    static toDomain(raw: Session) {
        const domainEntity = new Session();
        domainEntity.id = raw.id;

        if(raw.user) {
            domainEntity.user = UserMapper.toDomain(raw.user);
        }

        domainEntity.hash = raw.hash;
        domainEntity.created_at = raw.created_at;
        domainEntity.updated_at = raw.updated_at;
        domainEntity.deleted_at = raw.deleted_at;
        
        return domainEntity;
    }
}