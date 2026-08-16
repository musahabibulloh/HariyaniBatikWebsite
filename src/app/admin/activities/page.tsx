import { supabase } from "@/lib/supabase";
import Link from "next/link";
import DeleteActivityButton from "./DeleteActivityButton";

export default async function AdminActivities() {
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Kegiatan</h1>
          <p className="text-gray-500 mt-1">Daftar artikel dan liputan kegiatan pembatikan.</p>
        </div>
        <Link 
          href="/admin/activities/new" 
          className="bg-brand-primary text-white px-4 py-2 rounded shadow hover:bg-brand-secondary transition-colors"
        >
          + Tambah Kegiatan
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kegiatan / Judul
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pelaksanaan
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(!activities || activities.length === 0) ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  Belum ada kegiatan yang ditambahkan.
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {activity.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="h-10 w-10 rounded object-cover" src={activity.image_url} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No Img</span>
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1 max-w-sm">{activity.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.date ? new Date(activity.date).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/activities/${activity.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </Link>
                    <DeleteActivityButton activityId={activity.id} activityTitle={activity.title} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
