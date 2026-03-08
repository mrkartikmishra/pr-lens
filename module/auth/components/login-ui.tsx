"use client";

import { GitPullRequest, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";

const LoginUI = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "github",
      });
    } catch (error) {
      console.log("Authentication failed.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-background min-h-screen overflow-hidden text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_42%),radial-gradient(circle_at_88%_88%,color-mix(in_oklch,var(--chart-2)_22%,transparent),transparent_45%)] pointer-events-none" />

      <div className="relative flex items-center mx-auto px-6 sm:px-10 lg:px-14 py-10 w-full max-w-340 min-h-screen">
        <div className="items-center gap-12 lg:gap-20 grid lg:grid-cols-[1.2fr_0.88fr] w-full">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-card/70 backdrop-blur px-4 py-2 border border-border/60 rounded-full">
              <span className="inline-flex justify-center items-center bg-primary rounded-full w-8 h-8 text-primary-foreground">
                <GitPullRequest size={25} />
              </span>
              <span className="font-semibold text-lg tracking-tight">
                PRLens
              </span>
            </div>

            <div className="space-y-6 max-w-2xl">
              <p className="inline-flex bg-primary px-3 py-1 rounded-full font-bold text-xs uppercase tracking-[0.1em]">
                Automated PR Reviews for Engineering Teams
              </p>
              <h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                AI that reviews every pull request before humans do. Catch
                issues earlier.
                <span className="bg-primary px-1 italic">Merge faster.</span>
              </h1>
              <p className="max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed">
                PRLens automatically reviews GitHub pull requests using AI. It
                identifies bugs, security risks, performance issues, and style
                violations — so engineers spend less time on manual reviews and
                more time building.
              </p>
            </div>

            <div className="gap-4 grid sm:grid-cols-2 max-w-2xl">
              <div className="bg-card/70 shadow-sm backdrop-blur p-4 border border-border/70 rounded-xl">
                <p className="font-semibold text-2xl tracking-tight">
                  AI Reviews in Seconds
                </p>
                <p className="text-muted-foreground text-sm">
                  Every pull request analyzed instantly after opening.
                </p>
              </div>
              <div className="bg-card/70 shadow-sm backdrop-blur p-4 border border-border/70 rounded-xl">
                <p className="font-semibold text-2xl tracking-tight">
                  Built for GitHub Workflows
                </p>
                <p className="text-muted-foreground text-sm">
                  Works with your existing PR and CI process.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto lg:mx-0 w-full max-w-125">
            <div className="relative bg-card/80 shadow-2xl backdrop-blur-xl p-7 sm:p-9 border border-border/70 rounded-3xl overflow-hidden">
              <div className="-top-20 -right-13 absolute bg-primary/15 blur-3xl rounded-full w-52 h-52 pointer-events-none" />

              <div className="relative space-y-11">
                <div className="space-y-2">
                  <h2 className="font-semibold text-3xl sm:text-4xl text-center tracking-tight">
                    Sign in to PRLens
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Connect GitHub to start analyzing pull requests with AI.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="bg-primary shadow-lg shadow-primary/25 rounded-xl w-full h-12 font-semibold text-primary-foreground text-base hover:scale-101 transition cursor-pointer"
                >
                  <Github className="size-5!" />
                  {loading ? "Authenticating..." : "Continue with GitHub"}
                </Button>

                <div className="space-y-2 text-muted-foreground text-sm text-center">
                  <p>
                    New to PRLens?{" "}
                    <button
                      type="button"
                      className="font-semibold text-foreground hover:text-primary transition cursor-pointer"
                    >
                      Set up PRLens for your repository
                    </button>
                  </p>
                </div>

                <Separator className="bg-border/80" />

                <div className="flex justify-center items-center gap-3 text-muted-foreground text-xs sm:text-sm">
                  <button
                    type="button"
                    className="hover:text-primary transition cursor-pointer"
                  >
                    Terms of Service
                  </button>
                  <span>and</span>
                  <button
                    type="button"
                    className="hover:text-primary transition cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUI;
