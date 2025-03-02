import swagger from "@elysiajs/swagger";

const document = swagger({
    documentation: {
        info: {
            title: "ElysiaJS API Example",
            description: "ElysiaJS API Example",
            version: "1.0.0"
        },
        tags: [
            { name: "General", description: "General API" },
            { name: "User", description: "User API" },
            // ... other tags
        ]
    }, 
    path: "/api/docs",
});

export { document };