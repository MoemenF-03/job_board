import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import "@radix-ui/themes/styles.css";
import JobForm from "@/app/components/JobForm";

type PageProps={
    params:{
        orgId:string;
    }
};
export default async function NewListingForOrgPage(props:PageProps){

    

    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if(!user) return 'Please login to use this page';
    const orgId = props.params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id , organizationId:orgId});
    const hasAccess = oms.data.length > 0;

    if(!hasAccess) return 'You do not have access to this organization';
    return (
        <JobForm orgId={orgId}/>
    );
}