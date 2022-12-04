import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: "2na87sx6",
    dataset: 'production',
    apiVersion: 'v1',
    token: "skCz7PeIz9dXIhzfwBFPwVoobUE61zXV9WLtlt8YBDekjsfe6V9i4JGS417JImWlWqD5SEs6sW7y0hjN1FriF3aDP0ObUsI6F6fEJ144ohtqGfcj8e5G21KyN40fUqkLAU0j6OmpdgKo9wPTwr7JOHgMKItEzI0eZOsjh0roMj56coPCDzMm",
    useCdn: false,
})