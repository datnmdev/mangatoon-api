import type { Sequelize } from "sequelize";
import { account as _account } from "./account";
import type { accountAttributes, accountCreationAttributes } from "./account";
import { emailPasswordCredential as _emailPasswordCredential } from "./emailPasswordCredential";
import type { emailPasswordCredentialAttributes, emailPasswordCredentialCreationAttributes } from "./emailPasswordCredential";
import { facebookCredential as _facebookCredential } from "./facebookCredential";
import type { facebookCredentialAttributes, facebookCredentialCreationAttributes } from "./facebookCredential";
import { googleCredential as _googleCredential } from "./googleCredential";
import type { googleCredentialAttributes, googleCredentialCreationAttributes } from "./googleCredential";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _account as account,
  _emailPasswordCredential as emailPasswordCredential,
  _facebookCredential as facebookCredential,
  _googleCredential as googleCredential,
  _user as user,
};

export type {
  accountAttributes,
  accountCreationAttributes,
  emailPasswordCredentialAttributes,
  emailPasswordCredentialCreationAttributes,
  facebookCredentialAttributes,
  facebookCredentialCreationAttributes,
  googleCredentialAttributes,
  googleCredentialCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const account = _account.initModel(sequelize);
  const emailPasswordCredential = _emailPasswordCredential.initModel(sequelize);
  const facebookCredential = _facebookCredential.initModel(sequelize);
  const googleCredential = _googleCredential.initModel(sequelize);
  const user = _user.initModel(sequelize);

  emailPasswordCredential.belongsTo(account, { as: "id_account", foreignKey: "id"});
  account.hasOne(emailPasswordCredential, { as: "emailPasswordCredential", foreignKey: "id"});
  facebookCredential.belongsTo(account, { as: "id_account", foreignKey: "id"});
  account.hasOne(facebookCredential, { as: "facebookCredential", foreignKey: "id"});
  googleCredential.belongsTo(account, { as: "id_account", foreignKey: "id"});
  account.hasOne(googleCredential, { as: "googleCredential", foreignKey: "id"});
  account.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasOne(account, { as: "account", foreignKey: "userId"});

  return {
    account: account,
    emailPasswordCredential: emailPasswordCredential,
    facebookCredential: facebookCredential,
    googleCredential: googleCredential,
    user: user,
  };
}
