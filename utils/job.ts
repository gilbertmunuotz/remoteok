const AVATAR_COLORS_DARK = ["#1e3a8a", "#312e81", "#134e4a", "#4c1d95", "#831843"];
const AVATAR_COLORS_LIGHT = ["#dbeafe", "#e0e7ff", "#ccfbf1", "#ede9fe", "#fce7f3"];

function hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

export function getCompanyInitials(company?: string | null): string {
    if (!company?.trim()) return "?";

    const initials = company
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("");

    return initials || company.trim().slice(0, 2).toUpperCase();
}

export function getCompanyAvatarColor(company?: string | null, isDark = true): string {
    const palette = isDark ? AVATAR_COLORS_DARK : AVATAR_COLORS_LIGHT;
    const value = company?.trim() || "company";
    return palette[hashString(value) % palette.length];
}

export function formatLocation(location?: string | null): string {
    if (!location?.trim()) return "Remote";
    return location.replace(/,\s*$/, "").trim() || "Remote";
}

export function formatJobDate(date?: string | null): string | null {
    if (!date) return null;

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return null;

    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function formatSalary(min?: number, max?: number): string | null {
    const hasMin = typeof min === "number" && min > 0;
    const hasMax = typeof max === "number" && max > 0;

    if (!hasMin && !hasMax) return null;
    if (hasMin && hasMax) {
        return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
    }
    if (hasMin) return `From $${min!.toLocaleString()}`;
    return `Up to $${max!.toLocaleString()}`;
}

export function getJobLogo(job: { company_logo?: string | null; logo?: string | null }): string | undefined {
    const logo = job.company_logo?.trim() || job.logo?.trim();
    return logo || undefined;
}
