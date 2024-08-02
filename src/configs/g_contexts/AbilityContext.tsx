import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { createContext } from "react";
import { AnyAbility, AnyMongoAbility } from "@casl/ability";
import NotAuthorized from "../../pages/403";
import BlankLayout from "../layouts/BlankLayout";
import { useAuth } from "../g_hooks/useAuth";
import { AclGuardProps, ACLObj } from "../g_types/types";

const defaultACLObj: ACLObj = {
  action: "manage",
  subject: "all",
};

const AbilityContext = createContext<AnyAbility>(undefined!);

const AbilityProvider = (props: AclGuardProps) => {
  const auth = useAuth();
  const router = useRouter();
  const { aclAbilities, children } = props;
  const [ability, setAbility] = useState<AnyMongoAbility | undefined>(
    undefined
  );

  const defineRulesFor = (role: string, options: string[]) => {
    const { can, build } = new AbilityBuilder(createMongoAbility);
    if (role === "super-admin" || "admin") {
      can("manage", "all");
    } else {
      can("read", [...options]);
    }
    return build();
  };

  if (
    router.route === "/403" ||
    router.route === "/404" ||
    router.route === "/500" ||
    router.route === "/" ||
    router.route === "/login" ||
    router.route === "/register"
  ) {
    return <>{children}</>;
  }

  if (auth.user && auth.user.role && !ability) {
    const options = auth?.user?.role?.option?.map(
      (item: Record<string, any>) => item.value
    );
    setAbility(defineRulesFor(auth.user.role.value, options));
  }

  if (
    ability &&
    ability.can(aclAbilities.action ?? "read", aclAbilities.subject)
  ) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export { AbilityProvider, AbilityContext, defaultACLObj };
