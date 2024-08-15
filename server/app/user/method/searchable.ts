import { PrismaClient } from '@prisma/client';

export const UserWorkFieldsLabel: Record<string, string> = {
    NONE: 'Nenhum',
    FAMILY: 'Família',
    CIVIL: 'Civil',
    ENTERPRISE: 'Empresarial',
    INTELLECTUAL_PROPERTY: 'Propriedade intelectual',
    MORAL_AND_MATERIAL_DAMAGE: 'Danos morais e materiais',
    DIGITAL: 'Direito digital',
    CITIZENSHIP_IMMIGRATION: 'Cidadania e imigração',
    MEDICAL: 'Direito médico',
    REAL_ESTATE: 'Direito imobiliário',
    WELFARE: 'Previdenciário',
    CRIMINAL: 'Criminal',
    TRIBUTARY: 'Tributário',
    SPORTS_LAW: 'Desportivo',
    CONSUMER: 'Consumidor',
    WORKER: 'Trabalhista',
    MEDIATION_ARBITRATION: 'Mediação e arbitragem',
    IMPORT_EXPORT: 'Importação e exportação',
    ADMIN: 'Serviços administrativos',
    ADMIN_NOTARIES: 'Serviços cartorários',
    ADMIN_DOCUMENTS: 'Busca de documentos',
    BIDDING: 'Licitação',
    FINE_RESOURCES: 'Recursos de multas',
    MARITIME: 'Direito marítimo',
    EXTRADITION_ASYLUM: 'Extradição e asilo',
    MILITAR: 'Direito militar',
    ENVIRONMENTAL: 'Ambiental',
    OTHERS: 'Outros',
};

async function updateSearchable(prisma: PrismaClient, email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) return;

        const workFields = user.workFields.map(
            (key) => UserWorkFieldsLabel[key]
        );
        const highlightedWorkFields = user.highlightedWorkFields.map(
            (key) => UserWorkFieldsLabel[key]
        );

        const searchable: string[] = [
            user.name,
            user.surname,
            user.contactCity,
            user.contactCountry,
            ...workFields,
            ...highlightedWorkFields,
        ].map((s) => s.trim().toLowerCase());

        const search = searchable.join(';');

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                searchable,
                search,
            },
        });
    } catch (error) {}
}

export function UserUpdateSearchable(prisma: PrismaClient, email?: string) {
    if (!email) return;
    updateSearchable(prisma, email).then(console.log).catch(console.error);
}
