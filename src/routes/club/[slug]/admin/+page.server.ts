import { getDb } from "$lib/server/db";

// import { fail, message, superValidate } from 'sveltekit-superforms';
// import { valibot } from 'sveltekit-superforms/adapters';
// import { schema } from './schema';

// export const actions = {
// 	default: async ({ request }) => {
// 		const form = await superValidate(request, valibot(schema));

// 		if (!form.valid) {
// 			return fail(400, { form });
// 		}

// 		return message(form, 'Posted!');
// 	}
// };

export async function load(event) {
    const db = getDb(event);
    const sql="select * from members";
    const response = await db.prepare(sql).run();

    // const validateSchema = await superValidate({}, valibot(schema));
    console.log(response);
    return {
        response
    };
}