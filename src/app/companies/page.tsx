import { WorkOS } from "@workos-inc/node";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function CompaniesPage() {
  const { user } = await withAuth();

  if (!user) {
    return <div>You need to be logged in to see your companies.</div>;
  }

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  // Retrieve organizations the user is a member of
  const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
  });
  let username_ = user.firstName + " " + user.lastName;
  // Filter active organizations
  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );

  // Retrieve organization names
  const organizations = [];
  for (const membership of activeOrganizationMemberships) {
    const org = await workos.organizations.getOrganization(membership.organizationId);
    organizations.push({ id: org.id, name: org.name });
  }

  return (
    <div className="container">
      <h2 className="text-xl my-4">{username_}  Companies</h2>
      <h2 className="text-sm mb-2 text-gray-500">(Select a company to see related jobs)</h2>
      <div className=" inline-block ">
      {organizations.map((org) => (
          
          <Link 
          key={org.id}
          href={`/jobs/${org.id}`}
          className="py-2 px-2 inline-flex gap-2 items-center transition-transform duration-300 ease-in-out hover:scale-105 bg-gray-100 mb-2 border rounded-md"
        >
          {org.name}
          <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
        
          
        ))}
      </div>


      
        
      
    </div>
  );
}
