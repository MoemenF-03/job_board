'use server';

import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function createCompany(companyName: string, userId: string) {
  let existingOrg = null;
  let afterCursor: string | undefined = undefined;

  // Step 1: Iterate through all pages to find the existing organization
  do {
    const orgsPage = await workos.organizations.listOrganizations({
      after: afterCursor, // Fetch next page using the after cursor
    });

    existingOrg = orgsPage.data.find(
      (org) => org.name.toLowerCase() === companyName.toLowerCase()
    );

    afterCursor = orgsPage.listMetadata.after; // Set the cursor for the next page
  } while (!existingOrg && afterCursor); // Continue until found or no more pages

  let organizationId;

  // Step 2: If it exists, use the existing organization
  if (existingOrg) {
    console.log("Organization already exists:", existingOrg.name);
    organizationId = existingOrg.id;
  } else {
    // Step 3: Create a new organization
    const newOrg = await workos.organizations.createOrganization({
      name: companyName,
    });
    console.log("New organization created:", newOrg.name);
    organizationId = newOrg.id;
  }

  // Step 4: Add the user to the organization
  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: organizationId,
    roleSlug: "admin",
  });

  // Step 5: Revalidate and redirect
  
  revalidatePath("/new-listing");
  redirect("/new-listing");
}
