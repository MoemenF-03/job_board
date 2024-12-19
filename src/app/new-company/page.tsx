import { createCompany } from "@/app/actions/workosActions";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

export default async function NewCompanyPage() {
    const { user } = await withAuth();
    
    if (!user) {
        return (
            <div className="container">
                <div>You need to be logged in to create a company</div>
            </div>
        );
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    // Retrieve organization memberships for the user
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    });

    // Filter out active memberships and get organization names
    const activeOrganizationMemberships = organizationMemberships.data.filter(
        (om) => om.status === "active"
    );

    const organizationsNames: { [key: string]: string } = {};

    for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationsNames[organization.id] = organization.name;
    }

    async function handleNewCompanyFormSubmit(data: FormData) {
        'use server';
        const companyName = data.get('newCompanyName') as string;
        if (user) {
            
            await createCompany(companyName, user.id);
        }
    }

    return (
        <div className="container">
            <h2 className="text-lg mt-6">Create a new company</h2>
            <p className="text-gray-500 text-sm mb-2">
                To create a job listing, you first need to register a company.
            </p>

            <form action={handleNewCompanyFormSubmit} className="mb-5 flex gap-2">
                <input
                    name="newCompanyName"
                    type="text"
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder="Company name"
                />

                <button
                    type="submit"
                    className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md"
                >
                    Create company
                    <FontAwesomeIcon className="h-4" icon={faArrowAltCircleRight} />
                </button>
            </form>

            
        </div>
    );
}
