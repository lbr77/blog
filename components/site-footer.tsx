
export function SiteFooter() {
    return (<footer className="border-grid border-t py-6 md:py-0 bottom-0 left-0 right-0 bg-background">
        <div className="container-wrapper">
            <div className="container py-4">
                <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a href="https://github.com/lbr77" target="_blank" rel="noreferer" className="font-medium underline underline-offset-4">
                        Borui Li
                    </a>
                    . The source code is available on{" "}
                    <a href="https://github.com/lbr77/blog" target="_blank" rel="noreferer" className="font-medium underline underline-offset-4">
                        Github
                    </a>
                    . All rights reserved © {new Date().getFullYear()}.
                </div>
            </div>
        </div>
    </footer>)
}