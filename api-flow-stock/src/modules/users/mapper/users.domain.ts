import User from "../entities/user.entity";

export class UserMapper {
    static toDomain(raw: User) {
        const domainEntity = new User();
        domainEntity.id = raw.id;
        domainEntity.email = raw.email;
        domainEntity.password = raw.password;
        domainEntity.name = raw.name;
        domainEntity.emailVerifiedAt = raw.emailVerifiedAt;
        domainEntity.rememberToken = raw.rememberToken;
        domainEntity.phone = raw.phone;
        domainEntity.avatar = raw.avatar;
        domainEntity.level = raw.level;
        domainEntity.provider = raw.provider;
        domainEntity.socialId = raw.socialId;
        domainEntity.active = raw.active;
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;

        //TODO: instanciar e manipular url para o campo photo
        return domainEntity
    }

}