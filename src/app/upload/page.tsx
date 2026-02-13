import { UploadForm } from '@/components/upload/upload-form';

export default function UploadPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">
          Upload Content
        </h1>
        <UploadForm />
      </div>
    </main>
  );
}
